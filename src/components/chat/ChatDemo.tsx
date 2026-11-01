"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { TripCards } from "@/components/trip-cards";
import { kyotoMock } from "@/components/trip-cards/mock-kyoto";
import styles from "./chat.module.css";

const THINK_MS = 2000; // how long the pulsing dots show before the reply
const SUGGESTIONS = [
  "Plan a weekend in Kyoto for two",
  "Quiet Kyoto trip, food first",
  "Kyoto in April with a friend",
];

type Status = "thinking" | "cards" | "error";
type Msg =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "assistant"; status: Status };

export default function ChatDemo() {
  // Switch ON = replies work. OFF = the first reply fails, Try again works.
  const [replyWorks, setReplyWorks] = useState(true);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const idRef = useRef(1);
  const failedOnce = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // The input is locked while any reply is still thinking.
  const busy = messages.some((m) => m.role === "assistant" && m.status === "thinking");

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const el = logRef.current;
    if (!el) return;
    const last = messages[messages.length - 1];
    if (last && last.role === "assistant" && last.status === "cards") {
      const bot = el.querySelector<HTMLElement>(`[data-msg="${last.id}"]`);
      if (bot) {
        el.scrollTo({ top: bot.offsetTop - 12, behavior: "smooth" });
        return;
      }
    }
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Give the input back its focus once the lock lifts.
  useEffect(() => {
    if (!busy && messages.length > 0) inputRef.current?.focus();
  }, [busy, messages.length]);

  function setStatus(id: number, status: Status) {
    setMessages((m) => m.map((x) => (x.id === id && x.role === "assistant" ? { ...x, status } : x)));
  }

  function reply(id: number, shouldFail: boolean) {
    const t = setTimeout(() => setStatus(id, shouldFail ? "error" : "cards"), THINK_MS);
    timers.current.push(t);
  }

  function send(text: string) {
    const clean = text.trim();
    if (!clean || busy) return;
    const userId = idRef.current++;
    const botId = idRef.current++;
    setMessages((m) => [
      ...m,
      { id: userId, role: "user", text: clean },
      { id: botId, role: "assistant", status: "thinking" },
    ]);
    setDraft("");
    const fail = !replyWorks && !failedOnce.current;
    if (fail) failedOnce.current = true;
    reply(botId, fail);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(draft);
  }

  function retry(id: number) {
    setStatus(id, "thinking");
    reply(id, false); // the retry always works
  }

  function startOver() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    failedOnce.current = false;
    setMessages([]);
    setDraft("");
  }

  return (
    <div className={styles.page}>
      <div className={styles.controls}>
        <label className={styles.switchRow}>
          <button
            type="button"
            role="switch"
            aria-checked={replyWorks}
            className={styles.switch}
            onClick={() => setReplyWorks((v) => !v)}
          >
            <span className={styles.knob} />
          </button>
          <span>
            <strong>Reply works</strong>
            <small>{replyWorks ? "On: cards show after the dots" : "Off: first reply fails, Try again fixes it"}</small>
          </span>
        </label>
        <button type="button" className={styles.reset} onClick={startOver}>
          Start over
        </button>
      </div>

      <section className={styles.frame} aria-label="Trip planner chat">
        <header className={styles.header}>
          <span className={styles.avatar} aria-hidden="true">✦</span>
          <div>
            <h1>Trip planner</h1>
            <p>Stays, things to do, places to eat</p>
          </div>
        </header>

        <div className={styles.log} ref={logRef} role="log" aria-live="polite">
          {messages.length === 0 && (
            <div className={styles.empty}>
              <h2>Where to next?</h2>
              <p>Tell me when and who’s going. I’ll put the trip together.</p>
            </div>
          )}

          {messages.map((m) =>
            m.role === "user" ? (
              <div key={m.id} className={styles.user}>{m.text}</div>
            ) : (
              <div key={m.id} data-msg={m.id} className={styles.bot}>
                {m.status === "thinking" && (
                  <div className={styles.bubble} role="status" aria-label="Assistant is thinking">
                    <span className={styles.dots}><i /><i /><i /></span>
                  </div>
                )}
                {m.status === "error" && (
                  <div className={styles.bubble}>
                    <p className={styles.errText}>
                      Sorry, I couldn’t put your Kyoto weekend together just now. Let’s give it another go.
                    </p>
                    <button type="button" className={styles.retry} onClick={() => retry(m.id)}>
                      Try again
                    </button>
                  </div>
                )}
                {m.status === "cards" && (
                  <div className={styles.cards}>
                    <TripCards items={kyotoMock} />
                  </div>
                )}
              </div>
            )
          )}
        </div>

        <footer className={styles.footer}>
          <div className={styles.chips}>
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" className={styles.chip} disabled={busy} onClick={() => send(s)}>
                {s}
              </button>
            ))}
          </div>
          <form className={styles.composer} onSubmit={onSubmit} aria-busy={busy}>
            <input
              ref={inputRef}
              className={styles.input}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              disabled={busy}
              placeholder={busy ? "Planning your trip…" : "Ask about your trip"}
              aria-label="Message"
              autoComplete="off"
              enterKeyHint="send"
            />
            <button type="submit" className={styles.send} disabled={busy || draft.trim() === ""} aria-label="Send">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
            </button>
          </form>
        </footer>
      </section>
    </div>
  );
}

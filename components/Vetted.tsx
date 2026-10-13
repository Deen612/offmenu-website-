import { copy } from "@/content/copy";

export function Vetted() {
  const t = copy.vetted;
  return (
    <section className="section vetted" id="how" aria-labelledby="vetted-h">
      <div className="container vetted-grid">
        <div className="vetted-intro">
          <h2 className="h2" id="vetted-h">{t.h2}</h2>
        </div>
        <ol className="vetted-steps">
          {t.steps.map((s, i) => (
            <li key={s.title} className="vetted-step">
              <div>
                <h3 className="h3">{s.title}</h3>
                <p className="muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

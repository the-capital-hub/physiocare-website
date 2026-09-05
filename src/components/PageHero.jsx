import Reveal from "./Reveal";

export default function PageHero({ eyebrow, title, text }) {
  return (
    <section className="page-hero">
      <div className="container page-hero-grid">
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="display font-extrabold text-[#17221d]">{title}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="body-copy">{text}</p>
        </Reveal>
      </div>
    </section>
  );
}

import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, text, light = false }) {
  return (
    <Reveal>
      <div className="max-w-3xl">
        <span className={light ? "eyebrow text-white/80" : "eyebrow"}>{eyebrow}</span>
        <h2 className={`display mt-4 text-4xl font-extrabold sm:text-5xl ${light ? "text-white" : "text-[#17221d]"}`}>
          {title}
        </h2>
        {text && <p className={`body-copy mt-4 max-w-2xl text-[1rem] ${light ? "text-white/65" : ""}`}>{text}</p>}
      </div>
    </Reveal>
  );
}

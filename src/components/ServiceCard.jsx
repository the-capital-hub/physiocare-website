import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

export default function ServiceCard({ icon, title, text, number }) {
  const Icon = icon;

  return (
    <motion.article
      whileHover={{ y: -7 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="card group relative overflow-hidden p-6"
    >
      <div className="flex items-start justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#dfe8df] text-xl text-[#214d3a]">
          <Icon />
        </span>

        <span className="text-xs font-bold text-black/30">
          {number}
        </span>
      </div>

      <h3 className="mt-7 font-['Manrope'] text-xl font-bold tracking-[-0.03em]">
        {title}
      </h3>

      <p className="body-copy mt-3 text-sm">
        {text}
      </p>

      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#214d3a]">
        Explore
        <FiArrowUpRight />
      </span>
    </motion.article>
  );
}
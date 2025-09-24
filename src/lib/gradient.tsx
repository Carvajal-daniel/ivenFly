import React from 'react'

import { motion } from "framer-motion"

 type GradientBgProps = {
  className?: string;
}

const GradientBg = (className: GradientBgProps) => {
  return (
    <motion.div
        className={`${className.className}`}
        initial={{ opacity: 0, scale: 0.8, x: -50, y: -50 }}
        animate={{ opacity: 0.15, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
  )
}

export default GradientBg
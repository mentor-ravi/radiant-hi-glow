import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, Compass, Brain, Lightbulb } from "lucide-react";

export const PathFinderCTA = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-20 relative"
    >
      <div className="container mx-auto px-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-1 shadow-2xl"
        >
          {/* Glowing animated border effect */}
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 blur-xl"
          />

          <div className="relative bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-card/95 dark:to-card/95 backdrop-blur-xl rounded-3xl p-10 md:p-14">
            {/* Floating icons */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-8 left-8 text-4xl opacity-60"
              >
                <Lightbulb className="w-10 h-10 text-yellow-500" />
              </motion.div>
              <motion.div
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -10, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                className="absolute top-12 right-12 text-4xl opacity-60"
              >
                <Compass className="w-10 h-10 text-blue-600" />
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 4.5, repeat: Infinity, delay: 1 }}
                className="absolute bottom-16 left-16 text-4xl opacity-60"
              >
                <Brain className="w-10 h-10 text-purple-600" />
              </motion.div>
              <motion.div
                animate={{
                  rotate: [0, 180, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute bottom-12 right-16 text-4xl opacity-60"
              >
                <Sparkles className="w-10 h-10 text-green-500" />
              </motion.div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center space-y-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-400/20 to-blue-500/20 border border-blue-400/30 backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-semibold text-foreground/90">AI-Powered Discovery</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Unlock the खजाना Vault{" "}
                <span className="inline-block">💎</span>
              </h2>

              <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
                Discover a treasure chest of curated courses, tools, and resources to
                supercharge your learning journey. Everything you need, all in one place.
              </p>

              <motion.button
                onClick={() => navigate("/vault")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative mt-8 px-10 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-lg opacity-50"
                />
                <span className="relative flex items-center gap-2">
                  Explore the Vault
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    🚀
                  </motion.span>
                </span>
              </motion.button>

              <p className="text-sm text-muted-foreground pt-4">
                Curated Resources • Learning Tools • Career Opportunities
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

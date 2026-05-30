import { motion, AnimatePresence }
from 'framer-motion';

import {
  ShieldAlert
} from 'lucide-react';

function AlertBanner({ alert }) {

  return (

    <AnimatePresence>

      {alert && (

        <motion.div

          initial={{
            opacity: 0,
            y: -20
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          exit={{
            opacity: 0,
            y: -20
          }}

          transition={{
            duration: 0.3
          }}

          className="
            mt-6
            bg-red-500/10
            border
            border-red-500/20
            rounded-2xl
            p-5
            flex
            items-center
            gap-4
            shadow-lg
            shadow-red-500/10
          "
        >

          <div className="
            w-14
            h-14
            rounded-2xl
            bg-red-500/20
            flex
            items-center
            justify-center
            text-red-400
            animate-pulse
          ">

            <ShieldAlert size={28} />

          </div>

          <div>

            <h2 className="
              text-red-400
              font-bold
              text-lg
            ">
              Critical Security Alert
            </h2>

            <p className="
              text-slate-300
              mt-1
            ">
              {alert.event}
            </p>

            <div className="
              flex
              items-center
              gap-6
              mt-3
              text-sm
              text-slate-400
            ">

              <span>
                IP: {alert.ip}
              </span>

              <span>
                User: {alert.user}
              </span>

              <span>
                Severity: {alert.severity}
              </span>

            </div>

          </div>

        </motion.div>

      )}

    </AnimatePresence>

  );
}

export default AlertBanner;
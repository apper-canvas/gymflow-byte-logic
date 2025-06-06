import { motion } from 'framer-motion'
      import Title from '@/components/atoms/Title'
      import Button from '@/components/atoms/Button'

      const Modal = ({ isOpen, onClose, title, children, onSubmit, submitText = 'Save', showSubmit = true }) => {
        if (!isOpen) return null

        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 w-full max-w-md"
            >
              <Title as="h3" className="text-xl mb-4">{title}</Title>

              <div className="space-y-4">
                {children}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  onClick={onClose}
                  className="px-4 py-2 text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200"
                >
                  Cancel
                </Button>
                {showSubmit && (
                  <Button
                    onClick={onSubmit}
                    className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium hover:shadow-lg"
                  >
                    {submitText}
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        )
      }

      export default Modal
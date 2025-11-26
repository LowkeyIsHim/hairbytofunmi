import { useEffect } from 'react'

export default function ModalLightbox({ open, onClose, image, alt, children }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKey)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative max-w-3xl w-full bg-white rounded-xl overflow-hidden shadow-lg z-10">
        <div className="p-4">
          <img src={image} alt={alt} className="w-full h-auto rounded-md" />
          <div className="mt-3 flex justify-end gap-3">
            {children}
            <button onClick={onClose} className="px-3 py-2 rounded-md border">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

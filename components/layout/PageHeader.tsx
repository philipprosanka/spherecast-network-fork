import type { ReactNode } from 'react'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  /** Shown on the same row as `description` (e.g. filters beside subtitle). */
  descriptionAside?: ReactNode
  actions?: ReactNode
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  descriptionAside,
  actions,
}: PageHeaderProps) {
  return (
    <div className="page-header">
      <div className="page-header-main">
        {eyebrow && <div className="page-eyebrow">{eyebrow}</div>}
        <h1 className="page-title">{title}</h1>
        {description && !descriptionAside && (
          <p className="page-description">{description}</p>
        )}
        {description && descriptionAside && (
          <div className="page-description-row">
            <p className="page-description">{description}</p>
            <div className="page-description-aside">{descriptionAside}</div>
          </div>
        )}
        {!description && descriptionAside && (
          <div className="page-description-aside">{descriptionAside}</div>
        )}
      </div>
      {actions && <div className="page-actions">{actions}</div>}
    </div>
  )
}

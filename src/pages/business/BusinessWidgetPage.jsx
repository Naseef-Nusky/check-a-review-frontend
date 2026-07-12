import { useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import StarRating from '../../components/common/StarRating'

const widgetCode = `<div id="check-a-review-widget" data-business="tech-solutions-inc"></div>
<script src="https://checkareview.com/widget.js" async></script>`

export default function BusinessWidgetPage() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(widgetCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <PageHeader title="Review Widget" description="Embed reviews on your external website" />
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Embed Code</h2>
          <div className="relative rounded-xl border border-gray-200 bg-gray-900 p-4">
            <pre className="overflow-x-auto text-sm text-green-400">{widgetCode}</pre>
            <Button size="sm" className="absolute right-3 top-3" onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            Paste this code into your website HTML where you want the widget to appear.
          </p>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Preview</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-center">
              <h3 className="font-bold text-gray-900">Tech Solutions Inc</h3>
              <div className="mt-2 flex justify-center">
                <StarRating rating={4.8} showValue />
              </div>
              <p className="mt-1 text-sm text-gray-500">Trust Score: 92%</p>
              <div className="mt-4 rounded-lg bg-gray-50 p-3 text-left text-sm">
                <p className="font-medium">&quot;Excellent service!&quot;</p>
                <p className="mt-1 text-gray-500">— John D., 2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

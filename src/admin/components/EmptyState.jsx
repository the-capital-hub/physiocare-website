export default function EmptyState({ loading=false, loadingText="Loading records...", children="No records found." }) { return <p className="empty-state">{loading ? loadingText : children}</p>; }

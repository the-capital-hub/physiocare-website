export default function RecordForm({ onSubmit, children, className="record-form" }) { return <form className={className} onSubmit={onSubmit}>{children}</form>; }

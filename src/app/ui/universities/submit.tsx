import { useFormStatus } from 'react-dom';

export default function Submit() {
  const status = useFormStatus();
  return (
    <button
      type="submit"
      disabled={status.pending}
      className="rounded-xl bg-blue-600 p-3 text-white hover:bg-blue-500"
    >
      {status.pending ? '送信中...' : '送信'}
    </button>
  );
}

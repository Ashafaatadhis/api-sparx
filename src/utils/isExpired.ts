export default function isExpired(dateString: string): boolean {
  const date = new Date(dateString);
  const now = new Date();
  return date < now;
}

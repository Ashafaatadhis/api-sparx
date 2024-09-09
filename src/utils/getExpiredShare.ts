export default function getExpiredShare() {
  const currentDate = new Date();
  //   const expiresAt = new Date(currentDate.getTime() + 10 * 1000);
  const expiresAt = new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000);

  return expiresAt;
}

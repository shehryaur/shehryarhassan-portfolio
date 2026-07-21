/**
 * Soft, slowly drifting light orbs behind the whole page.
 * Purely decorative — pointer-events:none.
 */
export default function AmbientLight() {
  return (
    <div className="ambient-wrap" aria-hidden>
      <span className="ambient-orb a1" />
      <span className="ambient-orb a2" />
      <span className="ambient-orb a3" />
    </div>
  );
}

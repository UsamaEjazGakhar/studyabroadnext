// BDS specific page that reuses the MBBSBDSContent component
import MBBSBDSContent from "./MBBSBDSContent";

export const metadata = {
  title: "BDS Programme Details – September 2026 Intake",
  description: "Details for BDS admissions – September 2026 intake."
};

export default function BDSPage() {
  return <MBBSBDSContent />;
}

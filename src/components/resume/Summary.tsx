import { Section } from "~/components/resume/Index";
import { RESUME } from "~/utils/config";

export default function Summary() {
  return (
    <Section title="Summary">
      {RESUME.Summary}
    </Section>
  );
}

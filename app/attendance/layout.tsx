import AttendanceComponent from "@/components/attendance/attendance";

export default function AttendanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block md:max-w-[80%] justify-center text-center">
        <AttendanceComponent />

        {children}
      </div>
    </section>
  );
}

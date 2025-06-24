import { useEffect, useState } from "react";

type BizItem = {
  title: string;
  institution: string;
  date: string;
  link: string;
};

export default function Home() {
  const [data, setData] = useState<BizItem[]>([]);

  useEffect(() => {
    fetch("/bizinfo.json")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">정부 지원사업 공고</h1>
      <div className="grid gap-4">
        {data.map((item, idx) => (
          <div key={idx} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-600 hover:underline">
              {item.title}
            </a>
            <div className="text-sm text-gray-600 mt-1">{item.institution}</div>
            <div className="text-sm text-gray-500">{item.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
import Decision from "@/components/ui/Decision";
import treeData from "@/components/ui/data2.json";

console.log(treeData.questions);

export default function Home() {
  return (
    <main className="">
      {/* <DecisionTreeComponent data={treeData} /> */}
      <Decision data={treeData} />
    </main>
  );
}

// 1. Show questions with isAnswered = false & if subquestion.length = 0 move to next question
// otherwise move to subquestion and repeat;
// 2. Save answer on a button click and set isAnswered = true. Show next question based on condition above

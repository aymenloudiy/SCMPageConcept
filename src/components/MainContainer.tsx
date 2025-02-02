import Chatbot from "./Chatbot";
import LineChartContainer from "./LineChartContainer";

export default function MainContainer() {
  return (
    <div className="grid grid-cols-12 min-h-full h-full">
      <Chatbot></Chatbot>
      <LineChartContainer></LineChartContainer>
    </div>
  );
}

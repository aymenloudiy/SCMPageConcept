import Chatbot from "./Chatbot";
import LineChartContainer from "./LineChartContainer";

export default function MainContainer() {
  return (
    <div className="grid grid-cols-12">
      <Chatbot></Chatbot>
      <LineChartContainer></LineChartContainer>
    </div>
  );
}

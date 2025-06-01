import { useCallback, useState } from "react";
import "./Services.scss";
import { STEP_SERVICES } from "./enum";
import StartFromScratch from "./StartFromScratch/StartFromScratch";

const optionServices = [
  {
    keySelect: STEP_SERVICES.START_FROM_SCRATCH,
    title: "Start from scratch",
    content: "Generate new captions to engage, delight, or sell",
  },
  {
    keySelect: STEP_SERVICES.GET_INSPRIED,
    title: "Get inspired",
    content: "Generate post ideas and captions for a topic",
  },
];

const Services = () => {
  const [stepServices, setStepServices] = useState<STEP_SERVICES>(
    STEP_SERVICES.MAIN_SERVICES
  );

  const renderMainServices = () => (
    <div className="ServicesMain">
      <h2>Generate post ideas and captions in seconds</h2>
      <div className="ListOptionServices">
        {optionServices.map((el) => (
          <div
            key={el.keySelect}
            className="OptionServices"
            onClick={() => setStepServices(el.keySelect)}
          >
            <div className="OptionTitle">{el.title}</div>
            <div className="OptionContent">{el.content}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStepServices = useCallback(() => {
    switch (stepServices) {
      case STEP_SERVICES.MAIN_SERVICES: {
        return renderMainServices();
      }
      case STEP_SERVICES.START_FROM_SCRATCH: {
        return <StartFromScratch />;
      }
      case STEP_SERVICES.GET_INSPRIED: {
        return <h2>services</h2>;
      }
    }
  }, [stepServices]);
  return <div className="Services">{renderStepServices()}</div>;
};

export default Services;

import { useState } from "react";
import ModalSelect from "../../../components/ModalSelect/ModalSelect";
import "../Services.scss";
import { SOCIAL_POST } from "../enum";

interface GenerateCaptionProps {
  socialType?: SOCIAL_POST;
}

const OPTIONS = [
  { label: "Friendly", value: "Friendly" },
  { label: "Luxury", value: "Luxury" },
  { label: "Relaxed", value: "Relaxed" },
  { label: "Professional", value: "Professional" },
  { label: "Bold", value: "Bold" },
  { label: "Adventurous", value: "Adventurous" },
  { label: "Witty", value: "Witty" },
  { label: "Persuasive", value: "Persuasive" },
  { label: "Empathetic", value: "Empathetic" },
];

const listCaptionsGeneratedFake = [
  {
    title: "Skipli AI - the smarter",
    content:
      "Introducing Skipli AI - the smarter, faster way to craft compelling content  Experience all the magic of Al-driven wriing assistant and get great results with fewer headaches.#AI #ContentMarketing #Content",
  },
  {
    title: "SkipliAl creating content Social Media",
    content:
      "Say goodbye to writer's block  #SkipliAl is now available to make creating attention-grabbing content easie thaneverGeready totake yoursocialmedia game to the next level with #AI#SocialMedia #Writing",
  },
];

const GenerateCaption = (props: GenerateCaptionProps) => {
  const { socialType } = props;
  const [topic, setTopic] = useState<string>();
  const [sound, setSound] = useState<string>();
  const [listCaptionsGenerated, setListCaptionsGenerated] = useState<any[]>(
    listCaptionsGeneratedFake
  );

  const typeOfCaption = [
    {
      keyType: "topic",
      title: "What topic do you want a caption for?",
      component: (
        <input
          type="text"
          className="InputTopic"
          placeholder="Enter topic you want"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      ),
    },
    {
      keyType: "sound",
      title: "What topic do you want a caption for?",
      component: (
        <ModalSelect
          value={sound}
          options={OPTIONS}
          placeholder="Choose your caption sound"
          onChange={(val) => setSound(val)}
        />
      ),
    },
  ];

  const handelGenerateCaption = () => {
    setListCaptionsGenerated([]);
  };

  const handleShareCaptions = (data: any) => {
    console.log(data);
  };

  const handleSaveCaptions = (data: any) => {
    console.log(data);
  };

  return (
    <div className="GenerateCaptionMain">
      <div className="TopicAndSound">
        <h2>{socialType} post</h2>
        {typeOfCaption.map((el) => (
          <div key={el.keyType} className="TypesOfCaption">
            <div className="TitleTypeCaption">{el.title}</div>
            {el.component}
          </div>
        ))}
        <div className="RowButtonGenerateCaption">
          <button
            className="ButtonGenerateCaption"
            onClick={handelGenerateCaption}
          >
            Generate caption
          </button>
        </div>
      </div>

      {listCaptionsGenerated && listCaptionsGenerated.length > 0 && (
        <div className="ListCaptionsGenerated">
          <h2>Captions generated for you</h2>
          {listCaptionsGenerated.map((el, idx) => (
            <div key={idx} className="Captions">
              <div className="TextCaptions">
                <div className="TitleCaption">{el.title}</div>
                <div className="ContentCaption">{el.content}</div>
              </div>
              <div className="RowButtonListCaptions">
                <button
                  className="ButtonListCaptions ShareButton"
                  onClick={() => handleShareCaptions(el)}
                >
                  Share
                </button>
                <button
                  className="ButtonListCaptions SaveButton"
                  onClick={() => handleSaveCaptions(el)}
                >
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenerateCaption;

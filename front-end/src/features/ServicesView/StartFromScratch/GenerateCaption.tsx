import { useState } from "react";
import ModalSelect from "../../../components/ModalSelect/ModalSelect";
import "../Services.scss";
import { SOCIAL_POST } from "../enum";
import ContentItem from "../../../components/ContentItem/ContentItem";
import { post } from "../../../api/http";

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

// const listCaptionsGeneratedFake = [
//   {
//     title: "Skipli AI - the smarter",
//     content:
//       "Introducing Skipli AI - the smarter, faster way to craft compelling content  Experience all the magic of Al-driven wriing assistant and get great results with fewer headaches.#AI #ContentMarketing #Content",
//   },
//   {
//     title: "SkipliAl creating content Social Media",
//     content:
//       "Say goodbye to writer's block  #SkipliAl is now available to make creating attention-grabbing content easie thaneverGeready totake yoursocialmedia game to the next level with #AI#SocialMedia #Writing",
//   },
// ];

const GenerateCaption = (props: GenerateCaptionProps) => {
  const { socialType } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingItem, setLoadingItem] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>();
  const [sound, setSound] = useState<string>();
  const [listCaptionsGenerated, setListCaptionsGenerated] =
    useState<{ title?: string; content: string }[]>();

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

  const handelGenerateCaption = async () => {
    setLoading(true);
    try {
      const response = await post<string[]>("/content/generate-captions", {
        socialNetwork: socialType,
        subject: topic,
        tone: sound,
      });
      if (response && Array.isArray(response) && response.length > 0) {
        setListCaptionsGenerated(
          response.map((item: string) => ({ content: item }))
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleShareCaptions = (data: any) => {
    console.log(data);
  };

  const handleSaveCaptions = async (data: { content: string }) => {
    setLoadingItem(true);
    try {
      const response = await post<{ success: boolean }>("/content/save", {
        topic,
        data: [`${data.content}`],
        phoneNumber: localStorage.getItem("phone"),
      });
      if (response && response.success) {
        setListCaptionsGenerated((prev) => {
          return prev?.filter((item) => item.content !== data.content);
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingItem(false);
    }
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
            disabled={!topic || !sound || loading}
          >
            {loading ? "Generating...." : "Generate caption"}
          </button>
        </div>
      </div>

      {listCaptionsGenerated && listCaptionsGenerated.length > 0 && (
        <div className="ListCaptionsGenerated">
          <h2>Captions generated for you</h2>
          {listCaptionsGenerated.map((el, idx) => (
            <ContentItem
              key={idx}
              title={el.title}
              content={el.content}
              onShare={() => handleShareCaptions(el)}
              onSave={() => handleSaveCaptions(el)}
              saving={loadingItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GenerateCaption;

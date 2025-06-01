import { useState } from "react";
import "../Services.scss";

interface CreateCaptionFromIdeaProps {
  ideaGeneratedFromAI: string;
}

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

const CreateCaptionFromIdea = (props: CreateCaptionFromIdeaProps) => {
  const { ideaGeneratedFromAI } = props;
  const [listCaptionsGenerated, setListCaptionsGenerated] = useState<any[]>([]);

  const handelGenerateCaption = () => {
    setListCaptionsGenerated(listCaptionsGeneratedFake)
  };

  const handleShareCaptions = (data: any) => {
    console.log(data);
  };

  const handleSaveCaptions = (data: any) => {
    console.log(data);
  };

  return (
    <div className="GenerateCaptionFromIdea">
      <h2>Your Idea</h2>
      <div className="IdeaAI">{ideaGeneratedFromAI}</div>
      <div className="RowButtonGenerateCaption ButtonGenerateCaptionFromIdea">
        <button
          className="ButtonGenerateCaption"
          onClick={handelGenerateCaption}
        >
          Generate caption
        </button>
      </div>
      {listCaptionsGenerated && listCaptionsGenerated.length > 0 && (
        <div className="ListCaptionsGenerated">
          <div className="TitleListCaptionsGenerated">Captions generated for you</div>
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

export default CreateCaptionFromIdea;

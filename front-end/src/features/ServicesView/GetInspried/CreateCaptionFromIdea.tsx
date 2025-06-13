import { useState } from "react";
import "../Services.scss";
import ContentItem from "../../../components/ContentItem/ContentItem";
import { post } from "../../../api/http";

interface CreateCaptionFromIdeaProps {
  ideaGeneratedFromAI: string;
  topic: string;
}

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

const CreateCaptionFromIdea = (props: CreateCaptionFromIdeaProps) => {
  const { ideaGeneratedFromAI, topic } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [listCaptionsGenerated, setListCaptionsGenerated] = useState<any[]>([]);
  const [loadingItem, setLoadingItem] = useState<{load: boolean, content?: string}>({load: false});

  const handelGenerateCaption = async () => {
    setLoading(true);
    try {
      const response = await post<string[]>("/content/captions-from-idea", {
        idea: ideaGeneratedFromAI,
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
    setLoadingItem({load: true, content: data.content});
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
      setLoadingItem({load: false, content: undefined});
    }
  };

  return (
    <div className="GenerateCaptionFromIdea">
      <h2>Your Idea</h2>
      <div className="IdeaAI">{ideaGeneratedFromAI}</div>
      <div className="RowButtonGenerateCaption ButtonGenerateCaptionFromIdea">
        <button
          className="ButtonGenerateCaption"
          onClick={handelGenerateCaption}
          disabled={loading}
        >
          {loading ? "Generating caption..." : "Generate caption"}
        </button>
      </div>
      {listCaptionsGenerated && listCaptionsGenerated.length > 0 && (
        <div className="ListCaptionsGenerated">
          <div className="TitleListCaptionsGenerated">
            Captions generated for you
          </div>
          {listCaptionsGenerated.map((el, idx) => (
            <ContentItem
              key={idx}
              title={el.title}
              content={el.content}
              onShare={() => handleShareCaptions(el)}
              onSave={() => handleSaveCaptions(el)}
              saving={loadingItem.load && loadingItem.content === el.content}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateCaptionFromIdea;

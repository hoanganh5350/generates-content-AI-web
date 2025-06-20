import { useEffect, useMemo, useState } from "react";
import ContentItem from "../../components/ContentItem/ContentItem";
import "./Profile.scss";
import { get, post } from "../../api/http";

interface DataContentSave {
  id: string;
  phoneNumber: string;
  topic: string;
  data: string[];
  createdAt: string;
}

type SubContent = {
  id: string;
  text: string;
};

type GroupedContent = {
  topic: string;
  content: SubContent[];
};

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingItem, setLoadingItem] = useState<{load: boolean, id?: string}>({load: false});
  const [dataContentSave, setDataContentSave] = useState<DataContentSave[]>([]);
  const dataConvertRender = useMemo((): GroupedContent[] | undefined => {
    const newDataFilter = dataContentSave?.reduce<GroupedContent[]>((acc, currValue) => {
      const existingTopic = acc.find((item) => item.topic === currValue.topic);

      if (!existingTopic) {
        acc.push({
          topic: currValue.topic,
          content: currValue.data.map((item) => ({
            id: currValue.id,
            text: item,
          })),
        });
      } else {
        const newContent = currValue.data.map((item) => ({
          id: currValue.id,
          text: item,
        }));
        existingTopic.content.push(...newContent);
      }
      return acc;
    }, []);

    return newDataFilter.sort((a, b) => a.topic.length - b.topic.length)
  }, [dataContentSave]);
  const handleShare = (data: string) => {
    console.log("Share", data);
  };

  const handleUnSave = async (idContent: string) => {
    setLoadingItem({load: true, id: idContent});
    try {
      const response = await post<{ success: boolean }>("/content/unsave", {
        captionId: idContent,
      });
      if (response && response.success) {
        setDataContentSave((prev) => {
          const newData = [...prev];
          const itemUnsave = newData.filter((item) => item.id !== idContent);
          return itemUnsave;
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingItem({load: true, id: undefined});
    }
  };

  const getDataProfile = async () => {
    setLoading(true);
    try {
      const response = await get<DataContentSave[]>(
        `/content/user-contents?phone_number=${encodeURIComponent(
          localStorage.getItem("phone") as string
        )}`
      );
      if (response && Array.isArray(response) && response.length > 0) {
        setDataContentSave(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataProfile();
  }, []);

  return (
    <div className="Profile">
      <h2>Saved Content</h2>
      <div className="SaveContentContainer">
        {loading ? (
          "loading data..."
        ) : dataConvertRender && dataConvertRender.length > 0 ? (
          dataConvertRender.map((el) => (
            <div key={el.topic} className="BlockContent">
              <div className="HeaderTitle">{el.topic}</div>
              <div className="ListContentContainer">
                {el.content.length > 0 &&
                  el.content.map((item, idx) => (
                    <ContentItem
                      key={`${item.text}${idx}`}
                      className={"ContentItemGrid"}
                      content={item.text}
                      onShare={() => handleShare(item.id)}
                      onUnsave={() => handleUnSave(item.id)}
                      saving={loadingItem.load && loadingItem.id === item.id}
                    />
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div className="HeaderTitle">No data available</div>
        )}
      </div>
    </div>
  );
};

export default Profile;

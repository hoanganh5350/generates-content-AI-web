import { useState } from "react";
import "../Services.scss";
import { SOCIAL_POST } from "../enum";
import Facebook from "./facebookIcon";
import Instagram from "./instagramIcon";
import Twitter from "./twitterIcon";
import GenerateCaption from "./GenerateCaption";

const optionSocialPost = [
  {
    keySelect: SOCIAL_POST.FACEBOOK,
    title: "Facebook post",
    content: "Generate caption for a post",
    icon: <Facebook />,
  },
  {
    keySelect: SOCIAL_POST.INSTAGRAM,
    title: "Instagram post",
    content: "Generate caption for a post",
    icon: <Instagram />,
  },
  {
    keySelect: SOCIAL_POST.TWITTER,
    title: "Twitter post",
    content: "Generate caption for a post",
    icon: <Twitter />,
  },
];

const StartFromScratch = () => {
  const [socialPost, setSocialPost] = useState<SOCIAL_POST>();

  if (socialPost) return <GenerateCaption />;

  const renderStartFromScratch = () => (
    <div className="ServicesMain">
      <div className="ContentHeaderSocial">
        <h2>Generate unique captions from scratch</h2>
        <div className="ContentSocial">
          Choose the type of post you want a caption for, and let Skipli Al
          writeit for you
        </div>
        <div className="ContentSocial">
          What kind of post do you want a caption for?
        </div>
      </div>
      <div className="ListOptionSocial">
        {optionSocialPost.map((el) => (
          <div
            key={el.keySelect}
            className="OptionSocial"
            onClick={() => setSocialPost(el.keySelect)}
          >
            {el.icon}
            <div className="TextOptionSocial">
              <div className="OptionTitle">{el.title}</div>
              <div className="OptionContent">{el.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return <div className="StartFromScratch">{renderStartFromScratch()}</div>;
};

export default StartFromScratch;

import "./ContentItem.scss";
import "react-phone-number-input/style.css";

interface ContentItemProps {
  title?: string;
  className?: string;
  content: string;
  onShare: () => void;
  onSave?: () => void;
  onUnsave?: () => void;
}

const ContentItem = (props: ContentItemProps) => {
  const { title, className, content, onShare, onSave, onUnsave } = props;

  const handleShare = () => {
    onShare();
  };
  const handleSave = () => {
    onSave && onSave();
  };
  const handleUnsave = () => {
    onUnsave && onUnsave();
  };

  return (
    <div className={`ContentItem ${className}`}>
      <div className="TextContentItem">
        {title && <div className="TitleContentItem">{title}</div>}
        <div className="ContentContentItem">{content}</div>
      </div>
      <div className="RowButtonContentItem">
        <button
          className="ButtonContentItem ShareButton"
          onClick={() => handleShare()}
        >
          Share
        </button>
        {!!onSave && (
          <button
            className="ButtonContentItem SaveButton"
            onClick={() => handleSave()}
          >
            Save
          </button>
        )}
        {!!onUnsave && (
          <button
            className="ButtonContentItem SaveButton"
            onClick={() => handleUnsave()}
          >
            Unsave
          </button>
        )}
      </div>
    </div>
  );
};

export default ContentItem;

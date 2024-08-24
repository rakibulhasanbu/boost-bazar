import { Modal } from "antd";
import { ReactNode, useState } from "react";
import "./custom.css";

type TAppModalProps = {
  button?: ReactNode;
  children: ReactNode;
  title?: string;
  subTitle?: string;
  primaryButtonTitle?: string;
  primaryButtonAction?: () => void;
  cancelButtonTitle?: string;
  cancelButtonAction?: () => void;
  handleClose?: (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  modalOpen?: boolean;
  closeable?: boolean;
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppModal = ({
  button,
  title,
  subTitle,
  children,
  primaryButtonTitle,
  primaryButtonAction,
  cancelButtonTitle,
  cancelButtonAction,
  modalOpen,
  setModalOpen,
  closeable,
}: TAppModalProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = (value: boolean) => {
    if (setModalOpen) {
      setModalOpen(value);
    } else {
      setOpen(value);
    }
  };

  return (
    <div className="">
      {button && <div onClick={() => handleOpen(true)}>{button}</div>}
      <Modal
        closeIcon={closeable}
        maskClosable={closeable}
        title={
          <div>
            <h1 className="title text-xl ">{title}</h1>
            {subTitle && (
              <p className="text-dark-grey text-xs md:text-sm font-normal w-fit">
                {subTitle}
              </p>
            )}
          </div>
        }
        centered
        width="auto"
        open={modalOpen === undefined ? open : modalOpen}
        onOk={() => handleOpen(false)}
        onCancel={() => handleOpen(false)}
        footer={
          primaryButtonTitle || cancelButtonTitle ? (
            <div className="w-full flex items-center justify-center gap-2 lg:pt-2">
              {cancelButtonTitle && (
                <button
                  onClick={() => {
                    handleOpen(false);
                    if (cancelButtonAction) {
                      cancelButtonAction();
                    }
                  }}
                  className="text-black px-4 py-1 rounded-full bg-[#E8E8E8] hover:bg-textGreyBlack/15 text-sm"
                >
                  {cancelButtonTitle}
                </button>
              )}

              {primaryButtonTitle && (
                <button
                  onClick={() => {
                    handleOpen(false);
                    if (primaryButtonAction) {
                      primaryButtonAction();
                    }
                  }}
                  className="bg-primary px-4 py-1 rounded-full text-white text-sm"
                >
                  {primaryButtonTitle}
                </button>
              )}
            </div>
          ) : (
            []
          )
        }
      >
        {children}
      </Modal>
    </div>
  );
};

export default AppModal;

import CloseButton from '@/atoms/CloseButton/CloseButton';
import ModalButton from '@/atoms/ModalButton/ModalButton';
import { useState } from 'react';
import BoardSaveModal from '../BoardSaveModal/BoardSaveModal';
import ShareModal from '../ShareModal/ShareModal';
import { useNavigate, useMatch } from 'react-router-dom';
import { useDetailModalStore } from '@/zustand/useStyleStore';

const DetailModal = ({ onClose, item, imageSrc }) => {
  const navigate = useNavigate();
  const { showBoardModal, showShareModal, setShowBoardModal, setShowShareModal } = useDetailModalStore();

  const openBoardModal = () => {
    setShowBoardModal(true);
  };

  const openShareModal = () => {
    setShowShareModal(true);
  };

  const closeBoardModal = () => {
    setShowBoardModal(false);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };

  const ImageMatch = useMatch('/style/detail/:imageId/?');
  const layoutId = ImageMatch?.params.imageId;

  const moveToNewBoard = (imageId) => {
    if (location.pathname.startsWith('/style/detail')) {
      navigate(`/style/newBoard/${imageId}`, { state: { imageSrc } });
    }
  };

  return (
    <div className="relative w-[290px] h-[200px] top-[16px] left-[16px] xs:w-[380px] xs:h-[230px] xs:top-[16px] xs:left-[16px] border border-black rounded-xl flex justify-center items-center bg-white ">
      <CloseButton onClose={onClose} />
      <ul className="flex gap-8 xs:gap-12">
        <ModalButton href="#" fileName="savePlus" buttonText="보드에 저장" onClick={openBoardModal} />
        <ModalButton
          fileName="write"
          buttonText="글쓰기"
          onClick={() => moveToNewBoard(layoutId)}
          imageSrc={imageSrc}
        />
        <ModalButton href="#" fileName="linkCopy" buttonText="공유하기" onClick={openShareModal} />
      </ul>
      {showBoardModal && <BoardSaveModal onClose={closeBoardModal} text="기존 보드에 추가" />}
      {showShareModal && <ShareModal onClose={closeShareModal} />}
    </div>
  );
};

export default DetailModal;

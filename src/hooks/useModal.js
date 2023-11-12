import { useState } from "react";

const useModal = (setRowData) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);

      setRowData({
        이수: '',
        필수: '',
        과목명: '',
        학점: '',
        출석점수: '',
        과제점수: '',
        중간고사: '',
        기말고사: '',
        총점: '',
        평균: '',
        성적: ''
      });
    };
  
    return [isModalOpen, openModal, closeModal];
  };
  
  export default useModal;
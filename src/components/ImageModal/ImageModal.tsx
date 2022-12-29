interface ModalProps {
  url: string;
  hideModal: () => void;
}
const ModalComponent = ({ url, hideModal }: ModalProps) => {
  return (
    <section
      className="fixed w-full h-full  z-10 bg-[rgba(0,0,0,0.5)] "
      onClick={() => hideModal()}
    >
      <img className="fixed top-1/2 -translate-y-1/2" src={url} />
    </section>
  );
};
export default ModalComponent;

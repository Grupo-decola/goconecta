import React from "react";
import { Modal } from "@mantine/core";
import ReviewCreate from "../../Components/ReviewCreate/ReviewCreate";

/**
 * Modal de avaliação de pacote.
 * @param {object} props
 * @param {boolean} props.opened - Se o modal está aberto
 * @param {function} props.onClose - Função para fechar o modal
 * @param {string|null} props.packageId - ID do pacote selecionado
 * @param {function} props.onSubmit - Função chamada ao submeter avaliação
 */
function ModalAvaliacao({ opened, onClose, packageId, onSubmit }) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Avaliar pacote"
      centered
      size="lg"
    >
      {packageId && (
        <ReviewCreate
          onSubmit={onSubmit}
        />
      )}
    </Modal>
  );
}

export default ModalAvaliacao;

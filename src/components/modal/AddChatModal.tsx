import { Box, Button, Dialog, Flex, Input, Text } from "@chakra-ui/react";
import { CloseButton } from "../ui/close-button";
import { useState } from "react";
interface AddChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleAddChat: (email: string) => void;
}
export const AddChatModal = ({
  isOpen,
  onClose,
  handleAddChat,
}: AddChatModalProps) => {
  const [email, setEmail] = useState("");
  return (
    <Dialog.Root placement={"center"} open={isOpen} onOpenChange={onClose}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content p={4} bg={"white"} position={"relative"}>
          <Box position={"absolute"} right={1} top={1}>
            <Dialog.CloseTrigger asChild>
              <CloseButton p={0} size="2xs" />
            </Dialog.CloseTrigger>
          </Box>
          <Dialog.Header>
            <Flex justifyContent={"center"}>
              <Dialog.Title>Criar chat</Dialog.Title>
            </Flex>
          </Dialog.Header>
          <Dialog.Body>
            <label>
              <Text>Email</Text>
              <Input onChange={(e) => setEmail(e.target.value)} />
            </label>
          </Dialog.Body>
          <Dialog.Footer mt={4}>
            <Flex gap={2}>
              <Dialog.CloseTrigger>
                <Button
                  colorPalette={"gray"}
                  _hover={{ bg: "gray.300", transition: "all 0.5s" }}
                  px={2}
                >
                  Cancelar
                </Button>
              </Dialog.CloseTrigger>

              <Button
                onClick={() => {
                  handleAddChat(email);
                  onClose();
                }}
                colorPalette={"green"}
                px={2}
              >
                Adicionar
              </Button>
            </Flex>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

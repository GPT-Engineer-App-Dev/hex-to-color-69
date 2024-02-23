import React, { useState } from "react";
import { Box, Input, Button, Text, VStack, Heading, useToast } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Index = () => {
  const [colorHex, setColorHex] = useState("");
  const [colorName, setColorName] = useState("");
  const toast = useToast();

  const fetchColorName = async (hex) => {
    try {
      const response = await fetch(`https://api.color.pizza/v1/${hex}`);
      if (!response.ok) {
        throw new Error("Color not found");
      }
      const data = await response.json();
      if (data.colors && data.colors.length > 0) {
        setColorName(data.colors[0].name);
      } else {
        throw new Error("Color not found");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setColorName("");
    }
  };

  const handleColorSearch = () => {
    const trimmedHex = colorHex.trim().replace("#", "");
    if (/^[0-9A-Fa-f]{6}$/.test(trimmedHex)) {
      fetchColorName(trimmedHex);
    } else {
      toast({
        title: "Invalid Hex Code",
        description: "Please enter a valid hex color code.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <Box p={5} shadow="md" borderWidth="1px">
        <Heading fontSize="xl">Color Name Finder</Heading>
        <Text mt={4}>Enter a HEX color code to find its name.</Text>
        <Input placeholder="#aabbcc" value={colorHex} onChange={(e) => setColorHex(e.target.value)} mt={2} />
        <Button leftIcon={<FaSearch />} colorScheme="teal" mt={2} onClick={handleColorSearch}>
          Translate Hex
        </Button>
        {colorName && (
          <Text mt={2} fontSize="lg" fontWeight="semibold">
            Color Name: {colorName}
          </Text>
        )}
      </Box>
    </VStack>
  );
};

export default Index;

import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const trimmedHex = colorHex.trim().replace("#", "");
    if (/^[0-9A-Fa-f]{6}$/.test(trimmedHex)) {
      fetchColorName(trimmedHex);
    }
  }, [colorHex]);

  return (
    <VStack spacing={4} align="stretch">
      <Box p={5} shadow="md" borderWidth="1px">
        <Heading fontSize="xl">Color Name Finder</Heading>
        <Text mt={4}>Enter a HEX color code to find its name.</Text>
        <Input placeholder="#aabbcc" value={colorHex} onChange={(e) => setColorHex(e.target.value)} mt={2} />

        {colorName && (
          <Box mt={2} p={2} bg={`#${colorHex}`} color="white" borderWidth="1px">
            Color Preview
          </Box>
        )}
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

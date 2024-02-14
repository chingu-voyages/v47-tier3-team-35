"use client";
import { useEffect, useState, useRef } from "react";

import {
  Box,
  Typography,
  TextField,
  Slider,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material";
import CustomSelect from "./CustomSelect";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { addEditItem } from "../actions/CreateEditServerAction";
import uploadImages from "@/aws/content/uploadImages";

import { FoodType } from "@/prisma/mock/mockData";

import "./customstyles.css";
import DragDrop from "../../DragDrop";
import CreateSelect from "./CreateSelect";
import { Image } from "@prisma/client";
import { FileMediaType } from "@/aws/content/uploadImages";

interface FormInputs {
  type: "create" | "edit";
  spaces: string[];
  onClose: () => void;
  userId: string;
  itemData?: FoodType;
}

// COMPONENT
const FormInputs = ({
  type,
  spaces,
  onClose,
  userId,
  itemData,
}: FormInputs) => {
  // HandleForm

  // Space
  const [space, setSpace] = useState(
    itemData?.roomTitle ? itemData?.roomTitle : ""
  );
  const handleSpace = (val: string) => {
    setSpace(val);
  };

  // title
  const titleRef = useRef<HTMLInputElement | null>(null);

  // Image
  const [image, setImage] = useState<Image>(
    itemData?.image || {
      s3ObjKey: null,
      url: null,
    }
  );

  const handleImage = (imgs: FileMediaType[], url?: string) => {
    const img = imgs[0];
    setImage({
      s3ObjKey: img.objKey || "",
      url: url || "",
    });
  }

  const imgTitle = titleRef && titleRef.current ? titleRef?.current.value : "nofile";

  const srcToFile = async (src: string, fileName: string) => {
    const response = await fetch(src);
    const blob = await response.blob();
    const mimeType = response.headers.get("content-type");
    if (mimeType) {
      const file = new File([blob], fileName, { type: mimeType });
      // Use this test to make sure the image shows when generated:
      // console.log(file);
      // setImage({
      //   s3ObjKey: "",
      //   url: src || "",
      // });
      if (file) {
        console.log(file);
        const uploadedImgs = async (file: File) => {
          try {
            const imgData = await uploadImages({ files: [file] });
            if ("uploaded" in imgData && Array.isArray(imgData.uploaded)) {
              // imgData has the shape { uploaded: FileMediaType[] }
              const uploadedFiles: FileMediaType[] = imgData.uploaded;
              console.log(uploadedFiles);
              handleImage(uploadedFiles, src);
            }
          } catch (e) {
            console.error(e);
          }
        };
        uploadedImgs(file);
      }
    }
  };
  

  // description

  const descriptionRef = useRef<HTMLInputElement | null>(null);

  // price

  const priceRef = useRef<HTMLInputElement | null>(null);

  // labels
  const [labels, setLabels] = useState(itemData?.labels || []);
  const handleLabels = (val: string[]) => {
    setLabels(val);
  };

  // Threshold

  const thresholdRef = useRef<HTMLInputElement | null>(null);
  const text = thresholdRef?.current ? thresholdRef.current.children[1].getAttribute('style') : '0';
  const width = text ? text.split(/[%\s+]/) : '0'; // getting width value
  const threshold = parseInt(width[4]) / 10; // width percentage

  // Expiration date

  const expirationDateRef = useRef<HTMLInputElement | null>(null);

  const [expDateDisplay, setExpDateDisplay] = useState("");
  useEffect(() => {
    function convertToRFC3339(inputDateStr: string): string {
      const date = new Date(inputDateStr);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const RFC3339Date = `${year}-${month}-${day}`;
      return RFC3339Date;
    }
    if (itemData?.expirationDate) {
      const expDate = convertToRFC3339(itemData.expirationDate.toDateString());
      setExpDateDisplay(expDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      // action={(formData) => addEditItem(formData, userId, itemData)}
      onSubmit={(e) => {
        console.log("submitting");
        // Handle Image
        console.log(space);
        console.log(titleRef?.current?.value);
        console.log(image);
        console.log(priceRef?.current?.value);
        console.log(descriptionRef?.current?.value);
        console.log(threshold);
        console.log(labels);
        console.log(expirationDateRef?.current?.value);
        console.log(userId);
        if (
          titleRef.current &&
          titleRef.current?.value &&
          priceRef.current &&
          priceRef.current?.value &&
          descriptionRef.current &&
          descriptionRef.current?.value &&
          expirationDateRef.current &&
          expirationDateRef.current?.value
        ) {
          console.log("all information exists");
          addEditItem(
            space,
            titleRef.current.value,
            image,
            priceRef.current.value,
            descriptionRef.current.value,
            threshold,
            labels,
            expirationDateRef.current.value,
            userId,
            itemData
          );
        }
        onClose;
      }}
      className="p-10 flex flex-col bg-default-sys-light-surface-container-low"
    >
      {/* Heading */}

      <section className="modal-header w-full flex pb-10">
        <Box className="flex flex-col gap-8">
          <Typography
            className="text-default-sys-light-on-surface"
            variant="h2"
          >
            {`${type.slice(0, 1).toUpperCase()}${type.slice(1)}`} Item
          </Typography>
          <CustomSelect
            space={space}
            spaces={spaces}
            handleSpace={handleSpace}
          />
        </Box>
      </section>

      {/* Main */}
      <section className="modal-main h-full flex flex-col gap-8 md:gap-16 md:flex-row">
        {/* Left Section (desktop) */}
        {/* Title */}
        <Box className="h-full w-full flex flex-col gap-8 md:gap-0">
          <TextField
            className="h-14 mb-12"
            id="outlined-start-adornment"
            label="Name"
            defaultValue={itemData?.title}
            inputRef={titleRef}
            helperText=""
            variant="standard"
            placeholder="Item Name"
            name="title"
            // onChange={(e) => setNewTitle(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
          />

          {/* Image  */}

          <Box className="flex-grow relative">
            <DragDrop name={"image"} imageUrl={image.url || ""} handleImage={handleImage} />
            <Box className="image-icons absolute top-[12px] right-[12px] flex flex-row gap-3 z-50 pointer-events-none">
              <IconButton className="p-2 rounded-full bg-default-sys-light-on-primary border border-default-sys-light-primary">
                <FileUploadOutlinedIcon className="text-default-sys-light-primary" />
              </IconButton>
              <IconButton
                className="p-2 rounded-full bg-default-sys-light-primary pointer-events-auto cursor-pointer"
                onClick={() =>
                  srcToFile(
                    `https://source.unsplash.com/random/300x300/?${imgTitle}`,
                    imgTitle
                  )
                }
              >
                <AutoAwesomeIcon className="text-default-sys-light-on-primary" />
              </IconButton>
            </Box>
            <Box
              className={`flex-grow relative w-full h-full border-dashed border-default-sys-light-primary border-2 rounded-lg flex justify-center items-center p-10`}
            >
              <Box className=" px-4 py-2 flex items-center gap-4 z-0">
                <AddPhotoAlternateIcon className="h-10 w-10" />
                <Box className="text-sm">
                  Drag an image,{" "}
                  <FileUploadOutlinedIcon className="text-default-sys-light-primary rounded-full py-1 border border-default-sys-light-primary" />{" "}
                  upload, or{" "}
                  <AutoAwesomeIcon className="text-default-sys-light-primary rounded-full py-1 border border-default-sys-light-primary" />{" "}
                  generate an image.
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="hidden h-14 md:block"></Box>
        </Box>

        {/* Right Section (desktop) */}
        {/* description */}
        <Box className="h-full w-full flex flex-col justify-between gap-8 md:gap-5">
          <TextField
            className="h-14"
            id="outlined-start-adornment"
            label="Description"
            placeholder="Item Description"
            defaultValue={itemData?.description}
            inputRef={descriptionRef}
            helperText=""
            variant="standard"
            name="description"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
          />
          {/* price */}
          <TextField
            className="h-14"
            id="outlined-start-adornment"
            label="Price"
            placeholder="Item Price"
            defaultValue={itemData?.price}
            inputRef={priceRef}
            helperText=""
            variant="standard"
            name="price"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
              inputProps: {
                step: 0.01,
              },
            }}
          />

          {/* threshold */}
          <Box>
            <Typography id="threshold-input-label" gutterBottom>
              Threshold
            </Typography>
            <Slider
              aria-labelledby="threshold-input-label"
              aria-label="Always visible"
              defaultValue={itemData?.threshold || 5}
              ref={thresholdRef}
              // getAriaValueText={valuetext}
              step={1}
              min={0}
              max={10}
              marks
              valueLabelDisplay="on"
              name="threshold"
              sx={{
                "& .MuiSlider-valueLabel": {
                  fontSize: "16px",
                  color: "white",
                  backgroundColor: "primary.main",
                  borderRadius: "100%",
                  maxWidth: "34px",
                  aspectRatio: "1/1",
                },
                "& .MuiSlider-valueLabel::before": {
                  bottom: "1px",
                },
              }}
            />
          </Box>

          {/* labels */}
          <CreateSelect labels={labels} handleLabels={handleLabels} />

          {/* date */}
          <Box>
            <Typography
              variant="button"
              sx={{ textTransform: "unset", fontWeight: "unset" }}
              id="date-input-label"
              gutterBottom
            >
              Expiration Date
            </Typography>
            <TextField
              className="bg-default-sys-light-surface-bright"
              aria-labelledby="date-input-label"
              fullWidth
              id="standard-helperText"
              label=""
              // placeholder="mm/dd/yyyy"
              defaultValue={expDateDisplay}
              inputRef={expirationDateRef}
              helperText=""
              type="date"
              hiddenLabel
              name="date"
            />
          </Box>
          <Box className="flex flex-row justify-end gap-4">
            <Button
              type="button"
              className="rounded-full"
              variant="outlined"
              onClick={() => onClose()}
            >
              Cancel
            </Button>
            <Button type="submit" className="rounded-full" variant="contained">
              Save
            </Button>
          </Box>
        </Box>
      </section>
    </form>
  );
};

export default FormInputs;

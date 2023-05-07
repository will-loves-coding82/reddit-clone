import React, { useRef } from 'react';
import { Flex, Button, Image, Stack} from '@chakra-ui/react';

type ImageUploadProps = {
    selectedFile?: string;
    onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setSelectedTab: (value: string) => void;
    setSelectedFile: (value: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({ selectedFile, onSelectImage, setSelectedTab, setSelectedFile }) => {
    /* useRef will store a reference to an HTML element, in this case the file input.
        This means that the Chakra Button can take over its functionality by 
    */

    const selectedFileRef = useRef<HTMLInputElement>(null);

    return (
        <Flex direction='column' justify='center' align='center' width='100%'>
            {selectedFile ?
                (
                    <>
                        <Image src={selectedFile} maxWidth='400px' maxHeight='400px'/>
                        <Stack direction='row' mt={4} >
                            <Button height='28px' onClick={()=> setSelectedTab("Post")}> Back to Post</Button>
                            <Button variant='outline' height='28px' onClick={()=>setSelectedFile("")}> Remove </Button>
                        </Stack>
                        
                    </>
                )
                :
                (
                    <Flex justify='center' align='center' p={20} border='1px dashed' borderColor='gray.200' width='100%' borderRadius={4}>
                        {/*current refers to the type of input */}
                        <Button variant='outline' height='20px' onClick={() => selectedFileRef.current?.click()}>
                            Upload
                        </Button>
                        {/* We don't want to show this file input interface so we need to rely on useRef above */}
                        <input ref={selectedFileRef} type='file' onChange={onSelectImage} hidden />
                    </Flex>
                )}

        </Flex>
    )
}
export default ImageUpload;
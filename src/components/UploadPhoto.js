import ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// import './App.css';

export default class UploadPhoto extends PureComponent {
    state = {
        src: null,
        crop: this.props.noCrop
            ? {
                unit: '%',
                width: 100,
                height: 100,
            }
            : {
                unit: '%',
                width: 100,
                aspect: 1,
                x: 0,
                y: 0
            },
        file: null
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.file !== this.props.file) {
            // console.log(nextProps.file)
            this.onSelectFile(nextProps.file)
        }
    }

    onSelectFile = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({ src: reader.result })
            );
            reader.readAsDataURL(file);
        }
    };
    // onSelectFile = (e) => {
    //     if (e.target.files && e.target.files.length > 0) {
    //         const reader = new FileReader();
    //         reader.addEventListener('load', () =>
    //             this.setState({ src: reader.result })
    //         );
    //         reader.readAsDataURL(e.target.files[0]);
    //     }
    // };

    // If you setState the crop in here you should return false.
    onImageLoaded = (image) => {
        this.imageRef = image;
    };

    onCropComplete = (crop) => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const { croppedImageUrl, croppedImageBlob } = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({ croppedImageUrl });
            this.props.setCropUrl(croppedImageUrl)
            this.props.setCropBlob(croppedImageBlob)
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const pixelRatio = window.devicePixelRatio;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');

        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(new Error('Canvas is empty'));
                        return;
                    }
                    blob.name = fileName;
                    window.URL.revokeObjectURL(this.fileUrl);
                    this.fileUrl = window.URL.createObjectURL(blob);
                    resolve({ croppedImageUrl: this.fileUrl, croppedImageBlob: blob });
                },
                'image/jpeg',
                1
            );
        });
    }

    render() {
        const { crop, src } = this.state;

        return (
            <div style={{ backgroundColor: "#555", width: "calc(100% + 1px)" }}>
                {src && (
                    <div className="m-auto p-5 text-center" style={{ width: '100%' }}>
                        <ReactCrop
                            src={src}
                            crop={crop}
                            ruleOfThirds
                            onImageLoaded={this.onImageLoaded}
                            onComplete={this.onCropComplete}
                            onChange={this.onCropChange}
                            circularCrop={this.props.circleCrop}
                        />
                    </div >
                )}
            </div>
        );
    }
}



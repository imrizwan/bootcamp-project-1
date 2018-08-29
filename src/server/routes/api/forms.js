const PropertiesForm = require('../../models/PropertiesForm');
const User = require('../../models/User');

const path = require("path");
//add multer to manage multipart form
const multer = require("multer");

//storage management for the file
//that will be uploaded
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})



//management of the storage and the file that will be uploaded 
//.single expects the name of the file input field
const upload = multer({ storage: storage }).single("selectedImage");

module.exports = (app) => {
    app.post('/api/propertyform', upload, function (req, res, next) {

        const { body } = req;
        const {
            userId,
            username,
            majorCategory,
            category,
            type,
            description,
            price,
            bedrooms,
            bathrooms,
            furnishing,
            constructionstatus,
            listedby,
            SBArea,
            carpetArea,
            bachelorsallowed,
            maintenance,
            totalFloors,
            floorNumber,
            carparking,
            facing,
            projectname,
            location,
            name,
            phone,
        } = body;

        if (!type) {
            return res.send({
                success: false,
                message: "ERROR: Property type can not be blank!!!"
            })
        }
        if (!description) {
            return res.send({
                success: false,
                message: "ERROR: Description can not be blank!!!"
            })
        }
        if (!price) {
            return res.send({
                success: false,
                message: "ERROR: Price can not be blank!!!"
            })
        }
        if (!bedrooms) {
            return res.send({
                success: false,
                message: "ERROR: Bedrooms can not be blank!!!"
            })
        }
        if (!bathrooms) {
            return res.send({
                success: false,
                message: "ERROR: Bathrooms can not be blank!!!"
            })
        }
        if (!furnishing) {
            return res.send({
                success: false,
                message: "ERROR: Furnishing can not be blank!!!"
            })
        }
        if (category === "New Projects") {
            if (!constructionstatus) {
                return res.send({
                    success: false,
                    message: "ERROR: Construction Status can not be blank!!!"
                })
            }
        }
        if (!listedby) {
            return res.send({
                success: false,
                message: "ERROR: Listed By can not be blank!!!"
            })
        }
        if (!SBArea) {
            return res.send({
                success: false,
                message: "ERROR: SB Area can not be blank!!!"
            })
        }
        if (!carpetArea) {
            return res.send({
                success: false,
                message: "ERROR: Carpet Area can not be blank!!!"
            })
        }
        if (!bachelorsallowed) {
            return res.send({
                success: false,
                message: "ERROR: Bachelors Allowed can not be blank!!!"
            })
        }
        if (!maintenance) {
            return res.send({
                success: false,
                message: "ERROR: Maintenance can not be blank!!!"
            })
        }
        if (!totalFloors) {
            return res.send({
                success: false,
                message: "ERROR: Total Floors can not be blank!!!"
            })
        }
        if (!floorNumber) {
            return res.send({
                success: false,
                message: "ERROR: Floor Number can not be blank!!!"
            })
        }
        if (!carparking) {
            return res.send({
                success: false,
                message: "ERROR: Car parking can not be blank!!!"
            })
        }
        if (!facing) {
            return res.send({
                success: false,
                message: "ERROR: Facing can not be blank!!!"
            })
        }
        if (!projectname) {
            return res.send({
                success: false,
                message: "ERROR: project name can not be blank!!!"
            })
        }
        if (!location) {
            return res.send({
                success: false,
                message: "ERROR: Location can not be blank!!!"
            })
        }
        if (!name) {
            return res.send({
                success: false,
                message: "ERROR: Name can not be blank!!!"
            })
        }
        if (!phone) {
            return res.send({
                success: false,
                message: "ERROR: Phone can not be blank!!!"
            })
        }

        // ---------- MULTER UPLOAD FUNCTION -------------
        upload(req, res, function (err) {
            // need to check if the req.file is set.
            if (req.file == null || req.file == undefined || req.file == "") {
                //redirect to the same url            
                return res.send({
                    success: false,
                    message: "Image Not Found: Server error!!!"
                });

            } else {
                // An error occurred when uploading
                if (err) {
                    console.log(err);
                } else {
                    // Everything went fine
                    //define what to do with the params
                    //both the req.body and req.file(s) are accessble here
                    //console.log(req.file);


                    //store the file name to mongodb    
                    //we use the model to store the file.
                    const newForm = new PropertiesForm();
                    newForm.userId = userId;
                    newForm.username = username;
                    newForm.majorCategory = majorCategory;
                    newForm.category = category;
                    newForm.type = type;
                    newForm.description = description;
                    newForm.price = price;
                    newForm.bedrooms = bedrooms;
                    newForm.bathrooms = bathrooms;
                    newForm.furnishing = furnishing;
                    newForm.constructionstatus = constructionstatus;
                    newForm.listedby = listedby;
                    newForm.SBArea = SBArea;
                    newForm.carpetArea = carpetArea;
                    newForm.bachelorsallowed = bachelorsallowed;
                    newForm.maintenance = maintenance;
                    newForm.totalFloors = totalFloors;
                    newForm.floorNumber = floorNumber;
                    newForm.carparking = carparking;
                    newForm.facing = facing;
                    newForm.projectname = projectname;
                    newForm.location = location;
                    newForm.name = name;
                    newForm.phone = phone;
                    newForm.selectedImage = req.file.filename;
                    console.log(req.file);
                    //save the image
                    newForm.save((err, user) => {
                        if (err) {
                            return res.send({
                                success: false,
                                message: "ERROR: Server error!!!"
                            });
                        }
                        return res.send({
                            success: true,
                            message: "Success!!!"
                        });
                    });

                }

            }

        });

    });


    app.post('/api/dashboard', upload, function (req, res, next) {
        const { body } = req;
        const { userId, category, majorCategory } = body;

        if (majorCategory === 'Properties' && category !== 'all') {
            PropertiesForm.find({
                userId: userId,
                majorCategory: majorCategory,
                category: category
            }, (err, ads) => {
                if (err) {
                    console.log("ERROR FROM DASHBOARD", err);
                } else if (ads.length > 0) {
                    return res.send({
                        success: true,
                        ads: ads
                    });
                }
            });
        } else if (majorCategory === 'showall') {
            PropertiesForm.find({
                userId: userId,
            }, (err, ads) => {
                if (err) {
                    console.log("ERROR FROM DASHBOARD", err);
                } else if (ads.length > 0) {
                    return res.send({
                        success: true,
                        ads: ads
                    });
                }
            });
        } else if (((majorCategory === 'Properties' && category === 'all') || (majorCategory === 'Properties')) || ((majorCategory === 'Cars' && category === 'all') || (majorCategory === 'Cars'))) {
            PropertiesForm.find({
                userId: userId,
                majorCategory: majorCategory
            }, (err, ads) => {
                if (err) {
                    console.log("ERROR FROM DASHBOARD", err);
                } else if (ads.length > 0) {
                    return res.send({
                        success: true,
                        ads: ads
                    });
                }
            });
        }
    });

    app.post('/api/public', function (req, res, next) {

        const { body } = req;
        const { userId, category, majorCategory } = body;

        if (majorCategory === 'Properties' && category !== 'all') {
            PropertiesForm.find({
                majorCategory: majorCategory,
                category: category
            }, (err, ads) => {
                if (err) {
                    console.log("ERROR FROM DASHBOARD", err);
                } else if (ads.length > 0) {
                    return res.send({
                        success: true,
                        ads: ads
                    });
                }
            });
        } else if (majorCategory === 'showall') {
            PropertiesForm.find({
            }, (err, ads) => {
                if (err) {
                    console.log("ERROR FROM DASHBOARD", err);
                } else if (ads.length > 0) {
                    return res.send({
                        success: true,
                        ads: ads
                    });
                }
            });
        } else if (((majorCategory === 'Properties' && category === 'all') || (majorCategory === 'Properties')) || ((majorCategory === 'Cars' && category === 'all') || (majorCategory === 'Cars'))) {
            PropertiesForm.find({
                majorCategory: majorCategory
            }, (err, ads) => {
                if (err) {
                    console.log("ERROR FROM DASHBOARD", err);
                } else if (ads.length > 0) {
                    return res.send({
                        success: true,
                        ads: ads
                    });
                }
            });
        }
    });



    app.post("/api/getuserbyid", async (req, res) => {

        try {
            await User.find({
                _id: req.body.Aduser
            }, (err, user) => {
                if (err) {
                    console.log("ERROR FROM DASHBOARD", err);
                } else if (user.length > 0) {
                    let username = user[0].username;
                    let _id = user[0]._id;
                    return res.send({
                        success: true,
                        username: username,
                        _id: _id
                    });
                }
            });
        } catch (error) {
            res.sendStatus(500)
            console.error(error)
        }
    })

    app.post('/api/getadbyid', function (req, res, next) {

        const { body } = req;
        const { _id } = body;

        PropertiesForm.find({
            _id: _id
        }, (err, ads) => {
            if (err) {
                console.log("ERROR FROM DASHBOARD", err);
            } else if (ads.length > 0) {
                return res.send({
                    success: true,
                    ads: ads
                });
            }
        });
    });

    app.put('/api/editpropertyform', upload, function (req, res, next) {
        const { body } = req;
        const {
            _id,
            type,
            description,
            price,
            bedrooms,
            bathrooms,
            furnishing,
            constructionstatus,
            listedby,
            SBArea,
            carpetArea,
            bachelorsallowed,
            maintenance,
            totalFloors,
            floorNumber,
            carparking,
            facing,
            projectname,
            location,
            name,
            phone,
            selectedImage
        } = body;
        // ---------- MULTER UPLOAD FUNCTION -------------
        upload(req, res, function (err) {
            //save the image
            PropertiesForm.updateOne({
                _id: _id,
            }, {
                    $set: {
                        type: type,
                        description: description,
                        bedrooms: bedrooms,
                        bathrooms: bathrooms,
                        price: price,
                        furnishing: furnishing,
                        constructionstatus: constructionstatus,
                        listedby: listedby,
                        SBArea: SBArea,
                        carpetArea: carpetArea,
                        bachelorsallowed: bachelorsallowed,
                        maintenance: maintenance,
                        totalFloors: totalFloors,
                        floorNumber: floorNumber,
                        carparking: carparking,
                        facing: facing,
                        projectname: projectname,
                        location: location,
                        name: name,
                        phone: phone,
                        selectedImage: req.file ? req.file.filename : selectedImage
                    }
                }, null, (err, ads) => {
                    if (err) {
                        return res.send({
                            success: false,
                            message: "ERROR!"
                        });
                    } else {
                        return res.send({
                            success: true,
                            message: "Udated!"
                        });
                    }
                });
        });
    });

    app.delete('/api/delete', function (req, res, next) {

        if (req.body._id) {
            const { _id } = req.body;
            PropertiesForm.findByIdAndRemove({
                _id: _id
            }, (err, ads) => {
                if (err) {
                    console.log("ERROR FROM DASHBOARD", err);
                } else if (ads.length > 0) {
                    return res.send({
                        success: true,
                        ads: ads
                    });
                } else {
                    console.log("No Ads")
                }
            });
        }
        else console.log("No User");
    });
}

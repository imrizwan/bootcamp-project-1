const PropertiesForm = require('../../models/PropertiesForm');

module.exports = (app) => {
    app.post('/api/propertyform', function (req, res, next) {
        console.log("THIS IS FROM SERVER PropertiesForm", req.body);

        const { body } = req;
        const {
            userId,
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
            file
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

        const newForm = new PropertiesForm();
        newForm.userId = userId;
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
        newForm.file = file;

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

        //Marching Email if doesn't exist
        // User.find({
        //     email: email
        // }, (err, previousUsers) => {
        //     if (err) {
        //         return res.send({
        //             success: false,
        //             message: "ERROR: Server error!!!"
        //         })
        //     } else if (previousUsers.length > 0) {
        //         return res.send({
        //             success: false,
        //             message: "ERROR: Account Already Exist!!!"
        //         })
        //     }
        //     //Save the new user
        //     const newUser = new User();
        //     newUser.username = username;
        //     newUser.email = email;
        //     newUser.password = newUser.generateHash(password);
        //     newUser.save((err, user) => {
        //         if (err) {
        //             return res.send({
        //                 success: false,
        //                 message: "ERROR: Server error!!!"
        //             });
        //         }
        //         return res.send({
        //             success: true,
        //             message: "Signed up!!!"
        //         });
        //     });
        // });
    });

    app.post('/api/dashboard', function (req, res, next) {

        const { body } = req;
        const { userId, category, majorCategory } = body;
        console.log(userId, majorCategory, category);

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
        console.log(userId, majorCategory, category);

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

    app.post('/api/edit', function (req, res, next) {
        PropertiesForm.findByIdAndUpdate({
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

    app.post('/api/delete', function (req, res, next) {

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
            }
        });
    });

}

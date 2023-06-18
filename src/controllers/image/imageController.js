const assert = require('assert');
const createError = require('http-errors');
const {generateImage} = require('../../domain/generateImage');
const {saveImage} = require('../../domain/saveImage');
const {getAllImage} = require('../../domain/getImages');
const {generateNewVariant} = require('../../domain/generateVariant');
/**
 * @api {get} /:userId
 * @apiGroup  image
 * @apiVersion 1.0.0
 * @apiHeader {String} authorization Authorization token
 * @apiSuccessExample {json} 200:OK
 * @apiBody [ {
 * "url":" "www.image.com",
 * "id":" "1231231",
 * "imagePrompt":" "a image",
 * "original": true ,
 * }]
 * @apiSuccessExample {json} 200:Created
 * {
 * }
 * @apiSuccess 200 status OK
 * @apiError 401 status Unauthorized Token no Valido
 * @apiError 500 status Internal server Error error no esperado
 */

const getImagesController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const result = await getAllImage({ userId });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};


/**
 * @api {post} /generate
 * @apiGroup  image
 * @apiVersion 1.0.0
 * @apiHeader {String} authorization Authorization token
 * @apiBody {
 * "imagePrompt":" "a image",
 * }
 * @apiSuccessExample {json} 201:Created
[{
 * "url":" "www.image.com",
 * "id":" "1231231",
 * "imagePrompt":" "a image",
 * "original": true ,
 * }]
 * @apiSuccess 201 status Created Se subio la imagen
 * @apiError 400 status Bad Request
 * @apiError 401 status Unauthorized Token no Valido
 * @apiError 500 status Internal server Error error no esperado
 */

const generateImageController = async (req, res, next) => {
  try {
    assert(req.body?.imagePrompt, createError.BadRequest(`Missing prompt in body`));

    const result = await generateImage({ imagePrompt:req.body.imagePrompt,userId:req.userId });
    
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};



/**
 * @api {post} /
 * @apiGroup  image
 * @apiVersion 1.0.0
 * @apiHeader {String} authorization Authorization token
 * @apiBody  {
 * "id":" "1231231",
 * }
 * @apiSuccessExample {json} 201:Created
 * {}
 * @apiSuccess 201 status Created Se subio la imagen
 * @apiError 400 status Bad Request
 * @apiError 401 status Unauthorized Token no Valido
 * @apiError 500 status Internal server Error error no esperado
 */

const saveImageController = async (req, res, next) => {
  try {
    assert(req.body?.id, createError.BadRequest(`Missing id in body`));
    const userId = req.userId;
    await saveImage({ id:req.body?.id , userId });
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};



/**
 * @api {post} /variante
 * @apiGroup  image
 * @apiVersion 1.0.0
 * @apiHeader {String} authorization Authorization token
 * @apiBody  [{
 * "url":" "www.image.com",
 * "id":" "1231231",
 * "imagePrompt":" "a image",
 * "original": true ,
 * }]
 * @apiSuccessExample {json} 201:Created
 * {}
 * @apiSuccess 201 status Created Se subio la imagen
 * @apiError 400 status Bad Request
 * @apiError 401 status Unauthorized Token no Valido
 * @apiError 500 status Internal server Error error no esperado
 */

const variantImageController = async (req, res, next) => {
  try {

    assert(req.body.id, createError.BadRequest(`Missing id in params`));

    const result = await generateNewVariant({ id: req.body.id });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};





module.exports = {
  getImagesController, generateImageController, saveImageController, variantImageController

};
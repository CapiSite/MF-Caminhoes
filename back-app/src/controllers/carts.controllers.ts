import { authenticateAdmin } from '@/middlewares';
import { AuthenticatedRequest, AuthenticatedRequestAdmin } from '@/protocols';
import { Request, Response } from 'express';

export async function getAllCarts(req: Request, res: Response) {
  try{

  }catch(error) {
    
  }

}

export async function getSpecificCArt(req: Request, res: Response) {

  try{

  }catch(error) {
    
  }
}

export async function getMyCarts(req: AuthenticatedRequest, res: Response) {

  try{

  }catch(error) {

  }
  
}

export async function createCart(req: AuthenticatedRequest, res: Response) {

  try{

  }catch(error) {

  }
  
}

export async function editCart(req: AuthenticatedRequest, res: Response) {

  try{

  }catch(error) {

  }
}

export async function validateCart(req: AuthenticatedRequestAdmin, res: Response) {

  try{

  }catch(error) {

  }
}

export async function daleteCart(req: AuthenticatedRequestAdmin, res: Response) {
  
  try{

  }catch(error) {

  }
}
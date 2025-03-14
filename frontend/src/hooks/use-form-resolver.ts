import { FieldValues, UseFormReturn, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const useFormResolver = <T extends FieldValues>(
  schema: yup.ObjectSchema<T>
): UseFormReturn<T, any, undefined> => {
  return useForm<T>({ resolver: yupResolver(schema) as any })
}

export default useFormResolver

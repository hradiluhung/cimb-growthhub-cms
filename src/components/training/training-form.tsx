'use client'
import { useToast } from '@/hooks/use-toast'
import createTraining from '@/lib/actions/training/create-training'
import { cn, formatDate } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { useEffect, useState } from 'react'
import updateTraining from '@/lib/actions/training/update-training'

const trainingSchema = z.object({
  nama: z.string().nonempty({
    message: 'Nama tidak boleh kosong',
  }),
  nama_trainer: z.string().nonempty({
    message: 'Nama Trainer tidak boleh kosong',
  }),
  kapasitas: z.number().int().positive({
    message: 'Kapasitas harus berupa angka positif',
  }),
  tipe: z
    .enum(['private', 'public'], {
      required_error: 'Tipe tidak boleh kosong',
    })
    .refine((val) => val !== undefined, {
      message: 'Tipe tidak boleh kosong',
    }),
  deskripsi: z.string().nonempty({
    message: 'Deskripsi tidak boleh kosong',
  }),
  tanggal: z.date({
    required_error: 'Tanggal tidak boleh kosong',
  }),
  durasi: z.number().int().positive({
    message: 'Durasi harus berupa angka positif',
  }),
  status: z.optional(z.string()),
})

type TrainingFormData = z.infer<typeof trainingSchema>

export default function TrainingForm({
  type = 'add',
  defaultValues,
}: {
  type?: 'add' | 'edit'
  defaultValues?: Training
}) {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<TrainingFormData>({
    resolver: zodResolver(trainingSchema),
    defaultValues: {
      nama: defaultValues?.nama || '',
      nama_trainer: defaultValues?.nama_trainer || '',
      kapasitas: defaultValues?.kapasitas || 0,
      tipe: defaultValues?.tipe || undefined,
      deskripsi: defaultValues?.deskripsi || '',
      tanggal: (defaultValues?.tanggal && new Date(defaultValues?.tanggal)) || undefined,
      durasi: defaultValues?.durasi || 0,
      status: defaultValues?.status || undefined,
    },
  })

  useEffect(() => {
    if (defaultValues && type === 'edit') {
      form.reset({
        nama: defaultValues.nama,
        nama_trainer: defaultValues.nama_trainer,
        kapasitas: defaultValues.kapasitas,
        tipe: defaultValues.tipe,
        deskripsi: defaultValues.deskripsi,
        tanggal: new Date(defaultValues.tanggal),
        durasi: defaultValues.durasi,
        status: defaultValues.status,
      })
    }
  }, [defaultValues, form, type])

  const tipeOptions = [
    { label: 'Private', value: 'private' },
    { label: 'Public', value: 'public' },
  ]

  async function onSubmit(values: TrainingFormData) {
    try {
      setLoading(true)
      const { nama, nama_trainer, kapasitas, tipe, deskripsi, tanggal, durasi } = values

      const { success, message } =
        type === 'add'
          ? await createTraining({
              nama,
              nama_trainer,
              kapasitas,
              tipe,
              deskripsi,
              tanggal,
              durasi,
              status: 'on progress',
            })
          : await updateTraining({
              id: defaultValues?.id ?? '',
              nama,
              nama_trainer,
              kapasitas,
              tipe,
              deskripsi,
              tanggal,
              durasi,
              status: 'done',
            })

      if (success) {
        toast({
          title: `${type === 'add' ? 'Berhasil menambahkan' : 'Berhasil mengubah'} training`,
          description: message,
        })

        router.push('/admin/trainings')
      } else {
        throw new Error(message)
      }
    } catch (error: any) {
      toast({
        title: 'Gagal',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nama"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nama_trainer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Trainer</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama trainer" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="kapasitas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kapasitas</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Masukkan kapasitas"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tipe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipe</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tipe" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {tipeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tanggal"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="inline">Tanggal</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'pl-3 text-left font-normal mt-4 w-full',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? formatDate(field.value) : <span>Pilih tanggal</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown-buttons"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      fromYear={2024}
                      toYear={2030}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="durasi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Durasi (menit)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Masukkan durasi"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deskripsi"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Deskripsi</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-28 resize-none"
                    placeholder="Masukkan deskripsi"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          {type === 'edit' && (
            <FormField
              control={form.control}
              name="tipe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipe</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tipe" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tipeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button type="button" onClick={() => form.reset()} variant="secondary">
            Reset
          </Button>
          <Button type="submit" disabled={loading} className="flex items-center gap-1">
            {loading && <Loader2 className="animate-spin size-5" />}
            {type === 'add' ? 'Simpan' : 'Update'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

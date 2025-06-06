import Input from '@/components/atoms/Input'
      import Label from '@/components/atoms/Label'

      const FormField = ({ label, id, ...props }) => {
        return (
          <div>
            {label && <Label htmlFor={id}>{label}</Label>}
            <Input id={id} {...props} />
          </div>
        )
      }

      export default FormField
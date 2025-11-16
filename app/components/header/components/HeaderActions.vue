<template>
    <div class="flex items-center gap-2">
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="ghost" size="icon" class="md:hidden">
                    <Icon :name="menu.icon" class="w-5 h-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    v-for="item in menu.items"
                    :key="item.label"
                >
                    <Icon :name="item.icon" class="w-4 h-4 mr-2" />
                    {{ item.label }}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Icon name="lucide:log-in" class="w-4 h-4 mr-2" />
                    {{ loginButton.label }}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="ghost" size="icon" class="hidden md:flex">
                    <Icon :name="menu.icon" class="w-5 h-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    v-for="item in menu.items"
                    :key="item.label"
                >
                    <Icon :name="item.icon" class="w-4 h-4 mr-2" />
                    {{ item.label }}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="sm" class="hidden md:flex">
            {{ loginButton.label }}
        </Button>
    </div>
</template>

<script setup lang="ts">
const menu = {
    icon: 'lucide:more-horizontal',
    items: [
        { icon: 'lucide:user-plus', label: 'Seguir' },
        { icon: 'lucide:share-2', label: 'Compartilhar' }
    ]
}

const loginButton = {
    label: 'Entrar'
}
</script>

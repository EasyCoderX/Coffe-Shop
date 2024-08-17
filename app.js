document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items : [
            {id: 1, name: 'Robusta', img: 'https://images.unsplash.com/photo-1512372388054-a322888e67a6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' , price: 20000, 
                detail: 'Kopi yang pahit atau tajam dengan rasa seperti kayu dan karet dan memiliki kandungan gula yang lebih sedikit'},
            {id: 2, name: 'Arabica', img: 'https://images.unsplash.com/photo-1512372388054-a322888e67a6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' , price: 25000, 
                detail: 'Kopi yang cenderung terasa manis dan ringan dengan kadar kafein yang 2x lebih rendah namun kadar gula yang 2x lebih tinggi daripada Robusta'},
            {id: 3, name: 'Liberica', img: 'https://images.unsplash.com/photo-1512372388054-a322888e67a6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' , price: 30000, 
                detail: 'Kopi yang memiliki rasa yang beragam, mulai dari rasa buah-buahan hingga sedikit rasa kayu dengan kadar kafein yang lebih rendah daripada Arabica ataupun Robusta'},
            {id: 4, name: 'Excelsa', img: 'https://images.unsplash.com/photo-1512372388054-a322888e67a6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' , price: 35000, 
                detail: 'Kopi yang memiliki rasa buah yang tajam dengan sedikit rasa manis dan asam juga kandungan kafein yang tinggi'}
        ],
        modalTgl(index) {
            const modalId = `modal-${index}`;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.toggle('active');
            } else {
                console.error(`Modal with id ${modalId} not found`);
            }
        },
        closeIcon(index){
            const modalId = `modal-${index}`;
            const modal = document.getElementById(modalId);
            console.log('tes');
            modal.classList.remove('active');
        }
    }));

    Alpine.store('cart', {
        items : [],
        quantity : 0,
        total : 0,
        add(newItem){
            // cek apakah ada barang yang sama di cart
            const cartItem = this.items.find((item) =>  item.id === newItem.id);

            // jika tidak ada / cart masih kosong
            if(!cartItem) {
                this.items.push({...newItem, quantity: 1, total: newItem.price});
                this.quantity++;
                this.total += newItem.price;
            } else {
                // jika barang sudah ada cek apakah barang sama atau berbeda dengan yang ada di cart
                this.items = this.items.map((item) => {
                    // jika barang berbeda
                    if (item.id != newItem.id) {
                        return item;
                    } else{
                        // jika barang sudah ada tambah quantity dan totalnya
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                })
            }
        },
        remove(id){
            if(id.quantity > 1) {
                id.quantity--;
                id.total -= id.price;
                this.quantity--;
                this.total -= id.price;

            } else {
                this.items = this.items.filter((item) => item.id != id.id );
                id.quantity--;
                id.total -= id.price;
                this.quantity--;
                this.total -= id.price;

            }
        }
    })
});


// konversi ke mata uang rupiah
const rupiah = (nilai) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(nilai);
};

